
const initConfig = {
	// может стоит делать его муртвым чтобы меньше рендерить?
	alive: x => x >= 1,
	rules: x => 0,
	name: 'init'
}

const argmax = array => {
	return array.length ? array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1]: -1
}


const Engine = (canvas) => {
	const cellSizeX = Math.floor(canvas.width / 80)
	const cellSizeY = Math.floor(canvas.height / 60)
	const shadowSize = Math.min(cellSizeY, cellSizeX) * 1.7;
	const w = 80
	const h = 60
	const _ctx = canvas.getContext('2d')
	const configs = []
	let _alive;
	let _rules;
	let count = 0
	let _currentLaw = 'init'
	let statistics = {}
	let loot = []
	let lootImg = ''
	let _power = 0
	let onMouseCb = (x) => x 
	let onEnemyMouse = (x) => x

	const setLoot = ({img, size}) => {
		lootImg = img
	}
	const addConfig = (config) => {
		configs[config.name] = { ...config, id: count++, count:0 }
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
			const x = Math.random() * w * cellSizeX
			const y = Math.random() * h * cellSizeY
				loot.push({x:x, y:y})
				lootSpawn(time)
		}
		setTimeout(spawn, Math.random() * time)
	}

	const drawLoot = () => {
		loot.forEach(({x,y}) => {  
				_ctx.drawImage(lootImg, x - 150, y - 80)
		})
	}

	//server
	const intersection = (x, y) => {
		const epsil = 50;
		loot = loot.filter(l => {
			const cond = (Math.abs(l.x - x) + Math.abs(l.y - y)) > epsil
			//if (!cond) incPower()
			return cond
		})
	}
	const drawing = () => {
			const {x ,y} = cords;
			onMouseCb(x, y)
	}

	const init = () => {
		// удалить интервал
		canvas.addEventListener('mousemove',(event) =>{
			const {x, y} = getCords(event)
			cords = {x: Math.floor(x / cellSizeX), y: Math.floor(y / cellSizeY)}
			intersection(x, y)
		});
		canvas.addEventListener('touchmove',(event) =>{
			const {x, y} = getCords(event)
			cords = {x: Math.floor(x / cellSizeX), y: Math.floor(y / cellSizeY)}
			intersection(x, y)
		});
		//
		canvas.addEventListener('mousedown',(event) =>{
			drawing()
			canvas.addEventListener('mousemove', drawing);
		});
		canvas.addEventListener('touchstart',(event) =>{
			drawing()
			canvas.addEventListener('touchmove', drawing);
		});
		//
		canvas.addEventListener('mouseup', () => {
			canvas.removeEventListener('mousemove',drawing);
		});
		canvas.addEventListener('touchcancel', () => {
			canvas.removeEventListener('mousemove',drawing);
		});
		//
	}
	init()

	let world = []
	let cords = {}
	
	const getCords = event => {
		return {
			x:event.pageX - canvas.offsetLeft,
			y:event.pageY - canvas.offsetTop
		}
	}
	const use = name => {
		setConfig(name)
	}

	const draw = (i, j) => {
		const cell = world[i + j * w]
		const id = cell.race
		const image = configs[id].image
		if (image) _ctx.drawImage(image, i * cellSizeX, j * cellSizeY)	
	}
	const draw1 = (i, j) => {
		const cell = world[i + j * w]
		const id = cell.race
		const shadow = configs[id].shadow
		if (shadow){
			_ctx.beginPath()
			_ctx.fillStyle = `rgba(${shadow.r},${shadow.g},${shadow.b},0.13)`
			_ctx.arc((i + 0.8)*cellSizeX, (j + 0.8)*cellSizeY, shadowSize, 0, 2*Math.PI)
			_ctx.fill()
		}	
	}

	const paint = () => {
		_ctx.clearRect(0, 0, canvas.width, canvas.height)
		for (let i = 0; i < w; ++i){
			for (let j = 0; j < h; ++j){
				world[i + j*w].alive ? draw(i,j) : draw1(i,j)
			}
		}
	}

	const set = (wrld) => {
		world = wrld
	}
	const getStatistics = (name) => configs[name][count]
	const getPower = () => _power
	const initPower = (val) => _power = val 
	const onMouse = (cb) =>  onMouseCb = cb
	return {
		addConfig,
		use,
		getStatistics,
		setLoot,
		getPower,
		initPower,
		onMouse,
		paint,
		set
	}
}




export default Engine

