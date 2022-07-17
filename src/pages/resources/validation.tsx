import ValidationApp from "resources/validation/components/Validation";
import { delayPromise } from "utils/delay-promise";

export default function Validation(props: any) {
  return <ValidationApp />;
}

export async function getStaticProps() {
  const data = await delayPromise(500);
  return {
    props: {
    },
  };
}
