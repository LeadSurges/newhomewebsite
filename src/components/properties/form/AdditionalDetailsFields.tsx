import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from "../types";

interface AdditionalDetailsFieldsProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export const AdditionalDetailsFields = ({ formData, setFormData }: AdditionalDetailsFieldsProps) => {
  const handleJsonChange = (field: 'deposit_structure' | 'incentives', value: string) => {
    try {
      // Attempt to parse the JSON to validate it
      JSON.parse(value);
      setFormData({ ...formData, [field]: value });
    } catch (e) {
      // If it's not valid JSON, still update the field to allow for editing
      setFormData({ ...formData, [field]: value });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="deposit_structure">Deposit Structure (JSON)</Label>
        <Textarea
          id="deposit_structure"
          value={formData.deposit_structure || ''}
          onChange={(e) => handleJsonChange('deposit_structure', e.target.value)}
          placeholder='{"Deposit 1": "5% on signing", "Deposit 2": 25000}'
          className="font-mono"
          rows={4}
        />
      </div>

      <div>
        <Label htmlFor="incentives">Incentives (JSON)</Label>
        <Textarea
          id="incentives"
          value={formData.incentives || ''}
          onChange={(e) => handleJsonChange('incentives', e.target.value)}
          placeholder='{"First Year Free": "Maintenance fees covered", "Cash Back": 10000}'
          className="font-mono"
          rows={4}
        />
      </div>
    </div>
  );
};