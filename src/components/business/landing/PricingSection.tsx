import { BUSINESS_PRICE_ROWS } from "@/lib/business-pricing";
export function PricingSection() {
  return (
    <div className="bl-pricing">
      <table aria-label="Card pricing">
        <tbody>
          {BUSINESS_PRICE_ROWS.map(([label, value]) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Fees are shown again before you confirm each payment.</p>
    </div>
  );
}
