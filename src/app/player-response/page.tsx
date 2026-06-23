import { redirect } from "next/navigation";
import { intakeUrl } from "../_lib/seo";

export default function PlayerResponse() {
    redirect(intakeUrl);
}
