// worker 线程 worker.js

importScripts('https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.umd.min.js')

onmessage = function (e) {
  const { eventType, factoryAddress, bytecodeHash, config, index } = e.data

  if (eventType === 'START') {
    if (config.front && config.queen) {
      findCreate2Address(factoryAddress, bytecodeHash, config, index)
    } else {
      findCreate2(factoryAddress, bytecodeHash, config, index)
    }
  }
}

const total = 5000

const findCreate2Address = (factoryAddress, bytecodeHash, config, index) => {
  const runTime = Date.now()
  const baseNumber = runTime + Number(index)

  for (let i = 1; i < 0xfffffff; i++) {
    let salt = `0x${(baseNumber * i).toString(16).padStart(64, '0')}`
    const addr = ethers.utils
      .keccak256(`0x${['ff', factoryAddress, salt, bytecodeHash].map((x) => x.replace(/0x/, '')).join('')}`)
      .slice(-40)
      .toLowerCase()

    const _config = { index, number: i }
    if (i % total == 0) {
      postMessage({ salt, addr, envent: 'WATTING', config: _config })
    }

    if (addr.startsWith(config.frontNumber) && addr.endsWith(config.queenNumber)) {
      if (config.contain && addr.includes(config.containNumber)) {
        postMessage({ salt, addr: `0x${addr}`, envent: 'SUCCESE', config: _config })
        break
      }
      if (!config.contain) {
        postMessage({ salt, addr: `0x${addr}`, envent: 'SUCCESE', config: _config })
        break
      }
    }
  }
}

const findCreate2 = (factoryAddress, bytecodeHash, config, index) => {
  let funName = ''
  let str = ''
  if (config.front) {
    funName = 'startsWith'
    str = config.frontNumber
  }
  if (config.queen) {
    funName = 'endsWith'
    str = config.queenNumber
  }
  if (!config.front && !config.queen && config.contain) {
    funName = 'includes'
    str = config.containNumber
  }
  const runTime = new Date().getTime()
  const baseNumber = runTime + Number(index)

  for (let i = 0; i < 0xfffffff; i++) {
    let salt = `0x${(baseNumber * i).toString(16).padStart(64, '0')}`
    const addr = ethers.utils
      .keccak256(`0x${['ff', factoryAddress, salt, bytecodeHash].map((x) => x.replace(/0x/, '')).join('')}`)
      .slice(-40)
      .toLowerCase()

    const _config = { index, number: i }

    if (i % total == 0) {
      postMessage({ salt, addr: `0x${addr}`, envent: 'WATTING', config: _config })
    }
    if (addr[funName](str)) {
      if (funName !== 'includes' && config.contain) {
        if (addr.includes(config.containNumber)) {
          postMessage({ salt, addr: `0x${addr}`, envent: 'SUCCESE', config: _config })
          break
        }
      } else {
        postMessage({ salt, addr: `0x${addr}`, envent: 'SUCCESE', config: _config })
        break
      }
    }
  }
}
