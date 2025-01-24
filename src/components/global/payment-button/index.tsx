import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/use-subscription";
import { CreditCardIcon, Loader2 } from "lucide-react";
import React from "react";

type Props = {};

const PaymentButton = (props: Props) => {
  // const { onSubscribe, isProcessing } = useSubscription()
  return (
    <Button
      disabled={false}
      onClick={() => {}}
      className="bg-gradient-to-br
     text-white 
     rounded-full 
    from-[#6d60a3] 
    via-[#9434E6] 
    font-bold 
    to-[#CC3BD4]"
    >
      {false ? <Loader2 className="animate-spin" /> : <CreditCardIcon />}
      Upgrade
    </Button>
  );
};

export default PaymentButton;
