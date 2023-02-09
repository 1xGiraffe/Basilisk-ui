import { PlaceHolderIcon } from "assets/icons/tokens/PlaceholderIcon"
import { FC, ReactNode } from "react"
import { AssetIconWrapper, SChainedIcon, SIcon } from "./AssetIcon.styled"

import { ReactComponent as AUSD } from "assets/icons/tokens/AUSD.svg"
import { ReactComponent as BSX } from "assets/icons/tokens/BSX.svg"
import { ReactComponent as KAR } from "assets/icons/tokens/KAR.svg"
import { ReactComponent as PHA } from "assets/icons/tokens/PHA.svg"
import { ReactComponent as KSM } from "assets/icons/tokens/KSM.svg"
import { ReactComponent as TNKR } from "assets/icons/tokens/TNKR.svg"
import { ReactComponent as ZTG } from "assets/icons/tokens/ZTG.svg"
import { ReactComponent as XRT } from "assets/icons/tokens/XRT.svg"
import { ReactComponent as USDT } from "assets/icons/tokens/USDT.svg"
import { ReactComponent as PlaceholderIcon } from "assets/icons/tokens/PlaceholderIcon.svg"

export type AssetIconProps = {
  icon?: ReactNode
  chainedIcon?: ReactNode
  withChainedIcon?: boolean
}

export const AssetIcon: FC<AssetIconProps> = ({
  icon,
  chainedIcon,
  withChainedIcon = false,
}) => (
  <AssetIconWrapper>
    <SIcon>{icon || <PlaceHolderIcon />}</SIcon>
    {withChainedIcon && (
      <SChainedIcon>{chainedIcon || <PlaceHolderIcon />}</SChainedIcon>
    )}
  </AssetIconWrapper>
)

export function getAssetLogo(symbol: string | null | undefined) {
  const _symbol = symbol?.toUpperCase()

  if (_symbol === "AUSD") return <AUSD />
  if (_symbol === "BSX") return <BSX />
  if (_symbol === "KAR") return <KAR />
  if (_symbol === "KSM") return <KSM />
  if (_symbol === "PHA") return <PHA />
  if (_symbol === "TNKR") return <TNKR />
  if (_symbol === "ZTG") return <ZTG />
  if (_symbol === "XRT") return <XRT />
  if (_symbol === "USDT") return <USDT />

  return <PlaceholderIcon width={32} height={32} />
}

export function getAssetName(symbol: string | null | undefined) {
  const _symbol = symbol?.toUpperCase()

  if (_symbol === "AUSD") return "Acala Dollar"
  if (_symbol === "BSX") return "Basilisk"
  if (_symbol === "KAR") return "Karura"
  if (_symbol === "KSM") return "Kusama"
  if (_symbol === "PHA") return "Phala"
  if (_symbol === "TNKR") return "Tinkernet"
  if (_symbol === "ZTG") return "Zeitgeist"
  if (_symbol === "XRT") return "Robonomics"
  if (_symbol === "USDT") return "Statemine USDT"

  return "-"
}
