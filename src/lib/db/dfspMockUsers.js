const Config = require('../config')

const tempDfspList = [
  {
    id: 'userdfsp',
    name: 'User DFSP'
  },
  {
    id: 'userdfsp1',
    name: 'User DFSP 1'
  },
  {
    id: 'userdfsp2',
    name: 'User DFSP 2'
  }
]

const getDFSPList = async () => {
  const userConfig = await Config.getUserConfig()
  if (Config.getSystemConfig().HOSTING_ENABLED) {
    return tempDfspList
  } else if (userConfig.HUB_ONLY_MODE) {
    const dfsps = Object.keys(userConfig.ENDPOINTS_DFSP_WISE.dfsps || {})
    if (dfsps.length > 0) {
      const dfspsList = []
      dfsps.forEach(dfspId => {
        dfspsList.push({
          id: dfspId,
          name: dfspId
        })
      })
      return dfspsList
    }
  }
  return [{
    id: userConfig.DEFAULT_USER_FSPID,
    name: 'User DFSP'
  }]
}

const checkDFSP = async (dfspId) => {
  const dfspFound = (await getDFSPList()).find(item => item.id === dfspId)
  if (dfspFound) {
    return true
  } else {
    return false
  }
}

module.exports = {
  getDFSPList,
  checkDFSP
}
