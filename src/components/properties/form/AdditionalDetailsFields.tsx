import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from "../types";

interface AdditionalDetailsFieldsProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export const AdditionalDetailsFields = ({ formData, setFormData }: AdditionalDetailsFieldsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="deposit_structure">Deposit Structure</Label>
        <Textarea
          id="deposit_structure"
          value={formData.deposit_structure || ''}
          onChange={(e) => setFormData({ ...formData, deposit_structure: e.target.value })}
          placeholder="Enter deposit structure details"
          rows={4}
        />
      </div>

      <div>
        <Label htmlFor="incentives">Incentives</Label>
        <Textarea
          id="incentives"
          value={formData.incentives || ''}
          onChange={(e) => setFormData({ ...formData, incentives: e.target.value })}
          placeholder="Enter incentives details"
          rows={4}
        />
      </div>
    </div>
  );
};