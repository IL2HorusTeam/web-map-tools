import { library as FontAwesomeLibrary } from "@fortawesome/fontawesome-svg-core";
import { faChevronRight, faCircle } from "@fortawesome/free-solid-svg-icons";


export function configureFontAwesome() {
  FontAwesomeLibrary.add(faChevronRight, faCircle);
}
