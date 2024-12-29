interface PropertyPricingProps {
  maintenance_fee_per_sqft?: number;
  parking_cost?: number;
  storage_cost?: number;
  price_range_min?: number;
  price_range_max?: number;
  total_homes?: string;
  sales_center_hours?: string;
  ceilings?: string;
  architect?: string;
  interior_designer?: string;
  price_per_sqft?: string;
  construction_started?: string;
}

export const PropertyPricing = ({
  maintenance_fee_per_sqft,
  parking_cost,
  storage_cost,
  price_range_min,
  price_range_max,
  total_homes,
  sales_center_hours,
  ceilings,
  architect,
  interior_designer,
  price_per_sqft,
  construction_started,
}: PropertyPricingProps) => {
  const formatPrice = (value?: number) => {
    return value ? `$${value.toLocaleString()}` : 'N/A';
  };

  if (!maintenance_fee_per_sqft && !parking_cost && !storage_cost && !price_range_min && !price_range_max) {
    return null;
  }

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Pricing & Property Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(price_range_min || price_range_max) && (
          <div className="p-4 rounded-lg bg-secondary/50">
            <p className="text-sm text-muted-foreground">Price Range</p>
            <p className="font-medium">
              {formatPrice(price_range_min)} - {formatPrice(price_range_max)}
            </p>
          </div>
        )}
        {maintenance_fee_per_sqft && (
          <div className="p-4 rounded-lg bg-secondary/50">
            <p className="text-sm text-muted-foreground">Maintenance Fee (per sq ft)</p>
            <p className="font-medium">${maintenance_fee_per_sqft}</p>
          </div>
        )}
        {parking_cost && (
          <div className="p-4 rounded-lg bg-secondary/50">
            <p className="text-sm text-muted-foreground">Parking Cost</p>
            <p className="font-medium">${parking_cost.toLocaleString()}</p>
          </div>
        )}
        {storage_cost && (
          <div className="p-4 rounded-lg bg-secondary/50">
            <p className="text-sm text-muted-foreground">Storage Cost</p>
            <p className="font-medium">${storage_cost.toLocaleString()}</p>
          </div>
        )}
        {total_homes && (
          <div className="p-4 rounded-lg bg-secondary/50">
            <p className="text-sm text-muted-foreground">Total Homes</p>
            <p className="font-medium">{total_homes}</p>
          </div>
        )}
        {sales_center_hours && (
          <div className="p-4 rounded-lg bg-secondary/50">
            <p className="text-sm text-muted-foreground">Sales Center Hours</p>
            <p className="font-medium">{sales_center_hours}</p>
          </div>
        )}
        {price_per_sqft && (
          <div className="p-4 rounded-lg bg-secondary/50">
            <p className="text-sm text-muted-foreground">Price Per Sq Ft</p>
            <p className="font-medium">{price_per_sqft}</p>
          </div>
        )}
        {construction_started && (
          <div className="p-4 rounded-lg bg-secondary/50">
            <p className="text-sm text-muted-foreground">Construction Started</p>
            <p className="font-medium">{construction_started}</p>
          </div>
        )}
      </div>

      {(architect || interior_designer || ceilings) && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {architect && (
            <div className="p-4 rounded-lg bg-secondary/50">
              <p className="text-sm text-muted-foreground">Architect</p>
              <p className="font-medium">{architect}</p>
            </div>
          )}
          {interior_designer && (
            <div className="p-4 rounded-lg bg-secondary/50">
              <p className="text-sm text-muted-foreground">Interior Designer</p>
              <p className="font-medium">{interior_designer}</p>
            </div>
          )}
          {ceilings && (
            <div className="p-4 rounded-lg bg-secondary/50">
              <p className="text-sm text-muted-foreground">Ceilings</p>
              <p className="font-medium">{ceilings}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};