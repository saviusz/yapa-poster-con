"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


interface SubmitFormState {
  success: boolean;
  errors?: {
    image?: string;
    location?: string;
    description?: string;
    misc?: string;
  }
}

export async function submitForm(_state: SubmitFormState, data: FormData) : Promise<SubmitFormState> {
  
  let status : SubmitFormState = {
    success: true,
    errors: {}
  }

  const image = data.get("image");
  if(!image) status = {
    ...status,
    success: false,
    errors: { ...status.errors, image: "Image is required" }
  }
  
  const location = data.get("loclabel");
  if (!location) status = {
    ...status,
    success: false,
    errors: { ...status.errors, misc: "Location description is required" }
  }; 

  const description = data.get("description");

  const lat = data.get("lat");
  const lng = data.get("lng");
  if(!lat || !lng) status = {
    ...status,
    success: false,
    errors: { ...status.errors, location: "Location is required" }
  };

  if(!status.success) return status;
  
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return redirect("/login");



  const res = await supabase.from("submissions").insert({
    contestant_id: user.id,
    loc_desc: location,
    desc: description,
    loc: `POINT(${lng} ${lat})`,
  })
  
  return redirect("/submissions");
}
