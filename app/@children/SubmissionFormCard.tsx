import Button, { ButtonType } from "@/components/Button";
import FieldGroup from "@/components/FieldGroup";
import FormField from "@/components/FormField";
import ImageDropzone from "@/components/ImageDropzone";
import style from "./SubmissionFormCard.module.scss";

export function SubmissionFormCard() {
  return <div className={style.container}>
    <form>
      <FieldGroup>
        <ImageDropzone fieldName="image" />
        <FormField type={"text"} label='Opis lokalizacji (opcjonalny)' name='desc' />
        <Button type={ButtonType.Primary}>Wyślij</Button>
      </FieldGroup>
    </form>
  </div>;
}
