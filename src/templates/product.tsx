import React from "react";
import { Badge } from "@/components/ui/badge";
import pallet1 from "@/assets/background/pallet-img.png";
import palet2 from "@/assets/background/tahta-palet-video.png";
import BasicRating from "@/components/rating";
import InteractiveList from "@/components/list";
import PageHeader from "@/components/page-header";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Counter from "yet-another-react-lightbox/plugins/counter";

import "yet-another-react-lightbox/plugins/counter.css";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { SEO } from "@/components/seo";

type Props = {
  pageContext: {
    productData: {
      category: {
        category_name: string;
      };
      id: string;
      images: {
        asset: {
          gatsbyImageData: {
            images: {
              fallback: {
                src: string;
              };
            };
          };
        };
      }[];
      overview: {
        children: {
          text: string;
        }[];
      }[];
      ozellikler: {
        description: string;
        title: string;
      }[];
      seo_description: string;
      seo_keywords: string;
      seo_title: string;
      title: string;
      slug: {
        current: string;
      };
      rating: {
        rating: number;
        view_count: number;
      };
    };
    productPath: string;
  };
};

export default function ProductDetail({ pageContext }: Props) {
  const [openLightbox, setOpenLightbox] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const fullscreenRef = React.useRef(null);
  const [productImages, setProductImages] = React.useState<
    {
      src: string;
    }[]
  >();
  const { productData, pagePath } = pageContext;

  React.useEffect(() => {
    const images = productData.images.map((image) => {
      return {
        src: image.asset.gatsbyImageData.images.fallback.src,
      };
    });
    setProductImages(images);
  }, [productData]);

  return (
    <div>
      <Lightbox
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .8)" } }}
        open={openLightbox}
        plugins={[Fullscreen, Zoom, Slideshow, Counter]}
        fullscreen={{ ref: fullscreenRef }}
        controller={{
          closeOnBackdropClick: true,
        }}
        index={index}
        on={{
          view: ({ index: currentIndex }) => setIndex(currentIndex),
          click(props) {
            console.log(props);
          },
        }}
        // resim dışında bir yere tıklayınca kapat

        close={() => setOpenLightbox(false)}
        slides={productImages}
      />
      <PageHeader title={productData.title} />
      <div className="mx-auto max-w-7xl py-6 px-0 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-10 min-h-[645px] ">
          <div>
            <div
              className="rounded-lg flex items-center"
              onClick={() => setOpenLightbox(true)}
            >
             
              <div
                 onClick={() => {
                  setIndex(0);
                  setOpenLightbox(true);
                }}
              >
              <GatsbyImage
                      image={getImage(productData.images[0].asset) as any}
                      alt={productData.title}
                    />
              </div>
            </div>
            <div>
              <div className="flex space-x-2 px-6">
                <img
                  src={pallet1}
                  onClick={() => setOpenLightbox(true)}
                  alt="image"
                  className="h-16 w-16 border border-gray cursor-pointer transition ease-in-out delay-150 hover:scale-125"
                />
                {productData.images.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setIndex(index);
                      setOpenLightbox(true);
                    }}
                  >
                    <GatsbyImage
                      image={getImage(image.asset) as any}
                      className="h-16 w-16 border border-gray cursor-pointer transition ease-in-out delay-150 hover:scale-125"
                      alt={productData.title}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white mx-3 md:mx-0 p-5 rounded-lg shadow-lg">
            <Badge variant="success">Stokta Var</Badge>

            <div className="mt-5">
              <div>
                <span className="text-xl font-bold">{productData.title}</span>
              </div>
              <div className="mt-3">
                <div className="relative w-fit ">
                  <BasicRating count={productData.rating.rating} />
                  <div className="absolute top-[6px] -right-[93px] flex items-center space-x-1 text-gray-500">
                    <span className="text-[10px] text-gray-500">
                      ({productData.rating.view_count} kişi inceledi)
                    </span>
                  </div>
                </div>

                <div>
                  <p className="mt-4 text-sm leading-6 text-secondary">
                    {productData.overview?.[0].children[0].text}
                  </p>
                </div>

                <div>
                  <InteractiveList properties={productData.ozellikler} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export const Head = (props) => {
  let data = props.pageContext.productData;
  let path = props.pageContext.productPath;

  return (
    <SEO
      title={"Karadeniz Palet | " + data.title}
      description={data.seo_description}
      pathname={path}
      productImage={data.images[0].asset.gatsbyImageData.images.fallback.src}
    ></SEO>
  );
};
