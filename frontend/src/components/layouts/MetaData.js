import { Helmet } from "react-helmet-async"; //this wil be dislplayed in title of browser tab

export default function MetaData({ title }) {
  return (
    <Helmet>
      <title>{`${title} - JVLcart`}</title>
    </Helmet>
  );
}
