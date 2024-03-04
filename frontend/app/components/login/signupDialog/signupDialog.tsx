import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SignupDialogForm from "./signupDialogForm";

const SignupDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Sign Up</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign Up</DialogTitle>
        </DialogHeader>
        <SignupDialogForm />
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog;
