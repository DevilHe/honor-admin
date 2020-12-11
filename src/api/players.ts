import request from '@/utils/request'
import { Player } from './types'

export const defaultPlayerData: Player = {
  accountname: '',
  nickname: '',
  avatar: '',
  bravepoints: 0,
  exp: 0,
  id: 0,
  level: 0,
  rank: 0,
  wanttoplay: [],
  winningstreak: 0
}

export const getPlayers = (params: any) =>
  request({
    url: '/players',
    method: 'get',
    params
  })

export const getPlayer = (id: number) =>
  request({
    url: '/players/' + id.toString(),
    method: 'get'
  })
