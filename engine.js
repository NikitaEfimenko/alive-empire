
const initConfig = {
	// может стоит делать его муртвым чтобы меньше рендерить?
	alive: x => x >= 1,
	rules: x => 0,
	name: 'init'
}

const argmax = array => {
	return array.length ? array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1]: -1
}


const Engine = (width, height) => {
	const w = width
	const h = height
	const configs = []
	let _alive;
	let _rules;
	let count = 0
	let _currentLaw = 'init'
	let statistics = {}
	let loot = []

	//server
	const incPower = (power) => power += 10
	const decPower = (power) => power > 0 ? power-- : 0
	//
	//client
	const addConfig = (config) => {
		configs[config.name] = { ...config, count: 0, power: 50}
	}
	const setConfig = (name) => {
		const { alive, rules} = configs[name]
		_alive = alive;
		_rules = rules
		_currentLaw = name
	}

	addConfig(initConfig)
	setConfig(_currentLaw)

	//server
	const lootSpawn = (time = 1000) => {
		const spawn = () => {
			const x = Math.random() * w * cellSize
			const y = Math.random() * h * cellSize
				loot.push({x:x, y:y})
				lootSpawn(time)
		}
		setTimeout(spawn, Math.random() * time)
	}

	const drawing = (config) => {
			let { x, y, race, power } = config
			world[x + y * w].setState(1)
			world[x + y * w].setLaw(race)

	}

	const Cell = (state, law = 'init') => (index) => {
		const j = Math.floor(index / w)
		const i = index % w
		let _law = law;
		const c = (i, j) => {
			const _i = i < 0 ? w + i: i < w ? i : w - i
			const _j = j < 0 ? h + j: j < h ? j : h - j
			return _i + _j * w
		}
		let _state = state;
		const setState = (s) => _state = s
		const getState = () => _state
		const setLaw = (l) => _law = l 
		const getLaw = () => _law
		const siblings = () => [
			world[c(i - 1, j - 1)],
			world[c(i - 1, j)],
			world[c(i - 1, j + 1)],
			world[c(i, j - 1)],
			world[c(i, j + 1)],
			world[c(i + 1, j - 1)],
			world[c(i + 1, j)],
			world[c(i + 1, j + 1)]
		] 
		return {
			getState,
			siblings,
			index,
			getLaw,
			setState,
			setLaw
		}
	}
	let world = [...Array(w * h).keys()].map(Cell(0))

	const Law = sibl => {
		const m = {}
		sibl.forEach(sib => _alive(sib.getState()) ?  m[sib.getLaw()]++: 0)
		let law = 'init'
		const {init, ...res} = m
		const keys = Object.keys(res)
		const values = Object.values(res)
		const id = argmax(values)
		return id < 0 ? 'init': keys[id]
	}

	const next = (cell) => {
		const prev = cell.getState()
		const siblings = cell.siblings()
		const law = Law(siblings)
		setConfig(law)
		if (_alive(cell.getState())) configs[law][count]++
		const res = siblings.reduce((a, x) => a + x.getState(), 0)
		return Cell(_rules(prev, res, _alive), law)(cell.index)
	}

	const epoch = () => {
		for (let el in configs) {
			configs[el][count] = 0
		}
		world = world.map(next)
	}

	const Statistics = () => {
		res = []
		for (v in configs){
			res.push(configs[v][count])
		}
		return res.splice(1)
	}
	const get = () => world.map(c => {
		const law = c.getLaw()
		setConfig(law)
		return {
			alive: _alive(c.getState()),
			race:law
		}
	})
	return {
		addConfig,
		drawing,
		get,
		epoch,
		Statistics
	}
}




module.exports = Engine