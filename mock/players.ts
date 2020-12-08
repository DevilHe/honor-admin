import { Response, Request } from 'express'
import { Hero, Player } from '../src/api/types'
import { heros } from './heros'
import faker from 'faker'

faker.locale = 'zh_CN'

// 模拟玩家数据
const playerCount = 100
const playerList: Player[] = []
for (let i = 0; i < playerCount; i++) {
  playerList.push({
    id: i,
    accountname: faker.name.findName(),
    nickname: faker.name.findName(),
    avatar: faker.image.avatar(),
    bravepoints: faker.random.number(1000),
    exp: faker.random.number(100000),
    level: faker.random.number(30),
    rank: faker.random.number(200),
    wanttoplay: getWanttoplay(),
    winningstreak: faker.random.number(10)
  })
}

// 模拟想用英雄：三个且不能重复
function getWanttoplay() {
  const wanttoplay: Set<Hero> = new Set()
  while (wanttoplay.size < 3) {
    wanttoplay.add(heros[faker.random.number(9)])
  }
  return Array.from(wanttoplay)
}

// 路由实现
export const getPlayers = (req: Request, res: Response) => {
  // 从查询参数中获取分页、过滤关键词等参数
  const { accountname, page = 1, limit = 10 } = req.query

  // 过滤
  const mockList = playerList.filter(item => {
    if (accountname && item.accountname.indexOf((accountname as string)) < 0) {
      return false
    }
    return true
  })

  // 分页
  const pageList = mockList.filter((item, index) => index < (limit as number) * (page as number) && index >= (limit as number) * ((page as number) - 1))
  res.json({
    code: 20000,
    data: {
      total: mockList.length,
      players: pageList
    }
  })
}

// 根据id获取玩家信息
export const getPlayer = (req: Request, res: Response) => {
  const { id } = req.params
  for (const player of playerList) {
    if (player.id.toString() === id) {
      res.json({
        code: 20000,
        data: {
          player
        }
      })
    }
  }

  // 没找到响应数据，报错
  res.json({
    code: 70001,
    message: '没有找到相应的玩家信息'
  })
}

// 创建玩家
export const createPlayer = (req: Request, res: Response) => {
  // 新增的英雄数据
  const { player } = req.body

  // 直接返回
  res.json({
    code: 20000,
    data: {
      player
    }
  })
}

// 更新玩家
export const updatePlayer = (req: Request, res: Response) => {
  const { id } = req.params
  const { player } = req.body
  for (const item of playerList) {
    if (item.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          player
        }
      })
    }
  }
  res.json({
    code: 70001,
    message: '没有找到相应的玩家信息'
  })
}

// 删除玩家
export const deletePlayer = (req: Request, res: Response) => {
  res.json({
    code: 20000
  })
}
