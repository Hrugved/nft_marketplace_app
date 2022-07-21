import Image from "next/image"
import { useMoralis, useMoralisQuery } from "react-moralis"
import NFTBox from "../components/NFTBox"
import styles from "../styles/Home.module.css"

export default function Home() {

  const {isWeb3Enabled} = useMoralis()

  const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
    "ActiveItem",
    (query) => query.limit(10).descending("tokenId")
  )

  return (
    <div className="container mx-auto">
      <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
      <div className="flex flex-wrap gap-8">
        {isWeb3Enabled ? (
          fetchingListedNfts ? (
            <div>Loading...</div>
          ) : (
            listedNfts.map((nft) => {
              const { price, nftAddress, tokenId, marketplaceAddress, seller } = nft.attributes
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
