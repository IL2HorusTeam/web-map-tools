import { library as FontAwesomeLibrary } from "@fortawesome/fontawesome-svg-core";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";


export default function initFontAwesome() {
  FontAwesomeLibrary.add(
    faChevronRight,
    faCircleNotch,
    faGlobe,
    faTimesCircle,
  );
}
