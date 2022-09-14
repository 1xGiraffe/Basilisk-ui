import { useAssetMeta } from "./assetMeta"
import { useAssetDetails } from "./assetDetails"
import { getAssetLogo } from "components/AssetIcon/AssetIcon"
import { u32 } from "@polkadot/types"
import { Maybe } from "utils/types"

export const useAsset = (id: Maybe<u32>) => {
  const detail = useAssetDetails(id)
  const meta = useAssetMeta(id)

  const queries = [detail, meta]
  const isLoading = queries.some((q) => q.isLoading)

  const icon = getAssetLogo(detail.data?.name)

  if (detail.data == null || meta.data?.data == null)
    return { isLoading, data: undefined }

  return {
    isLoading,
    data: {
      ...detail.data,
      ...meta.data.data,
      icon,
    },
  }
}