interface PropertyPricingProps {
  maintenance_fee_per_sqft?: number;
  parking_cost?: number;
  storage_cost?: number;
  price_range_min?: number;
  price_range_max?: number;
}

export const PropertyPricing = ({
  maintenance_fee_per_sqft,
  parking_cost,
  storage_cost,
  price_range_min,
  price_range_max,
}: PropertyPricingProps) => {
  const formatPrice = (value?: number) => {
    return value ? `$${value.toLocaleString()}` : 'N/A';
  };

  if (!maintenance_fee_per_sqft && !parking_cost && !storage_cost && !price_range_min && !price_range_max) {
    return null;
  }

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Pricing Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(price_range_min || price_range_max) && (
          <div>
            <p className="text-sm text-muted-foreground">Price Range</p>
            <p className="font-medium">
              {formatPrice(price_range_min)} - {formatPrice(price_range_max)}
            </p>
          </div>
        )}
        {maintenance_fee_per_sqft && (
          <div>
            <p className="text-sm text-muted-foreground">Maintenance Fee (per sq ft)</p>
            <p className="font-medium">${maintenance_fee_per_sqft}</p>
          </div>
        )}
        {parking_cost && (
          <div>
            <p className="text-sm text-muted-foreground">Parking Cost</p>
            <p className="font-medium">${parking_cost.toLocaleString()}</p>
          </div>
        )}
        {storage_cost && (
          <div>
            <p className="text-sm text-muted-foreground">Storage Cost</p>
            <p className="font-medium">${storage_cost.toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};