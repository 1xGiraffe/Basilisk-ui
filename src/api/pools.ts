import { useQueries, useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "utils/queryKeys"
import { useApiPromise, useTradeRouter } from "utils/api"
import { ApiPromise } from "@polkadot/api"
import { TradeRouter } from "@galacticcouncil/sdk"
import { AccountId32 } from "@polkadot/types/interfaces"
import { useMemo } from "react"
import { u32 } from "@polkadot/types"
import { useTotalIssuance } from "./totalIssuance"
import { useTokenBalance } from "./balances"
import { useAccountStore } from "../state/store"

export const usePools = () => {
  const tradeRouter = useTradeRouter()
  return useQuery(QUERY_KEYS.pools, getPools(tradeRouter))
}

export const usePoolShareToken = (poolId: string) => {
  const api = useApiPromise()

  return useQuery(
    QUERY_KEYS.poolShareToken(poolId),
    getPoolShareToken(api, poolId),
  )
}

export const usePoolsWithShareTokens = () => {
  const pools = usePools()
  const shareTokens = usePoolShareTokens(
    pools.data?.map((pool) => pool.address) ?? [],
  )
  const queries = [pools, ...shareTokens]
  const isLoading = queries.some((query) => query.isLoading)

  const data = useMemo(() => {
    if (pools.data && shareTokens.every((query) => query.data)) {
      return pools.data.map((pool) => ({
        ...pool,
        shareToken: shareTokens.find((shareToken) => {
          if (shareToken.data) {
            return shareToken.data.poolId === pool.address
          }
          return null
        })?.data,
      }))
    }
    return []
  }, [shareTokens, pools.data])

  return { isLoading, data }
}

export const usePoolShareTokens = (poolIds: (string | AccountId32)[]) => {
  const api = useApiPromise()

  return useQueries({
    queries: poolIds.map((id) => ({
      queryKey: QUERY_KEYS.poolShareToken(id),
      queryFn: getPoolShareToken(api, id),
      enabled: !!id,
    })),
  })
}

export const getPools = (tradeRouter: TradeRouter) => async () =>
  tradeRouter.getPools()

const getPoolShareToken =
  (api: ApiPromise, poolId: string | AccountId32) => async () => {
    const token = await api.query.xyk.shareToken(poolId)
    return { poolId, token }
  }


export const useShareOfPool = (asset: u32) => {

  const { account } = useAccountStore()
  const totalIssuance = useTotalIssuance(asset)
  const totalBalance = useTokenBalance(asset, account?.address)

  const queries = [totalIssuance, totalBalance]
  const isLoading = queries.some(query => query.isLoading)

  const shareOfPool = useMemo(() => {

    if(totalIssuance.data && totalBalance.data) {
      return totalBalance.data.balance.div(totalIssuance.data.total).multipliedBy(100)
    }

    return null
  }, [totalBalance, totalIssuance])


  return { data: shareOfPool, isLoading}
}
