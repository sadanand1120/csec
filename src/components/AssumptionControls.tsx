export default function AssumptionControls() {
  return (
    <div className="assumption-grid">
      <label className="field" htmlFor="filing-status">
        <span>Tax profile</span>
        <select id="filing-status" value="single-w2" disabled>
          <option value="single-w2">Single W-2 adult</option>
        </select>
      </label>
      <label className="field" htmlFor="children">
        <span>Children</span>
        <select id="children" value="0" disabled>
          <option value="0">0</option>
        </select>
      </label>
      <label className="field" htmlFor="housing">
        <span>Housing</span>
        <select id="housing" value="renter-1br" disabled>
          <option value="renter-1br">Renter, 1BR</option>
        </select>
      </label>
      <label className="field" htmlFor="basket">
        <span>Basket</span>
        <select id="basket" value="basic-baseline" disabled>
          <option value="basic-baseline">Basic baseline</option>
        </select>
      </label>
      <label className="field wide" htmlFor="surplus">
        <span>Surplus mode</span>
        <select id="surplus" value="preserve-nominal" disabled>
          <option value="preserve-nominal">Preserve nominal after-basket surplus</option>
        </select>
      </label>
    </div>
  );
}
