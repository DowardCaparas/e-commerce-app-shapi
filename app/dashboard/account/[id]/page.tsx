import { fetchAccountById } from "@/app/lib/data";
import AccountProfile from "@/app/ui/account-profile";

const AccountSettingsPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const params = await props.params;
  const id = params.id;
  const account = await fetchAccountById(id);
  return <AccountProfile account={account}/>;
};

export default AccountSettingsPage;
