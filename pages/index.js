import Image from "next/image"
import { useMoralis, useMoralisQuery } from "react-moralis"
import NFTBox from "../components/NFTBox"
import styles from "../styles/Home.module.css"
import networkMapping from "../constants/networkMapping.json"
import { useQuery } from "@apollo/client"
import GET_ACTIVE_ITEMS from "../constants/subgraphQueries"

export default function Home() {
  const { chainId, isWeb3Enabled } = useMoralis()
  const chainString = chainId ? parseInt(chainId) : "31337"
  const marketplaceAddress = networkMapping[chainString].NftMarketplace[0]

  const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS)

  return (
    <div className="container mx-auto">
      <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
      <div className="flex flex-wrap gap-8">
        {isWeb3Enabled ? (
          loading || !listedNfts ? (
            <div>Loading...</div>
          ) : (
            listedNfts.activeItems.map((nft) => {
              const { price, nftAddress, tokenId, seller } = nft
              return (
                <NFTBox
                  price={price}
                  nftAddress={nftAddress}
                  tokenId={tokenId}
                  marketplaceAddress={marketplaceAddress}
                  seller={seller}
                  key={`${nftAddress}${tokenId}`}
                />
              )
            })
          )
        ) : (
          <div>Web3 not enabled</div>
        )}
      </div>
    </div>
  )
}
