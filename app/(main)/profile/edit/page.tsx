import type { Metadata } from "next";
import PageMainHeading from "@/app/(main)/_components/PageMainHeading";
import EditProfileForm from "./_components/Form";

export const metadata: Metadata = {
  title: "Edit Profile",
};

export default function EditProfilePage() {
  return (
    <>
      <PageMainHeading>Edit Profile</PageMainHeading>
      <EditProfileForm />
    </>
  );
}
