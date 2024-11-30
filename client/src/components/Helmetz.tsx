import { Helmet } from "react-helmet";
import { FC } from "react";

interface HelmetzProps {
  title: string;
  description: string;
  keywords: string;
  metaTags: object;
}
const Helmetz: FC<HelmetzProps> = ({
  title,
  description,
  keywords,
  metaTags,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {metaTags &&
        Object.entries(metaTags).map(([key, value]) => (
          <meta key={key} name={key} content={value} />
        ))}
    </Helmet>
  );
};

export default Helmetz;
