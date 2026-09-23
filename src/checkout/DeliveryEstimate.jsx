import PropTypes from "prop-types";
import getDeliveryEstimate from "../utils/deliveryEstimate";

function DeliveryEstimate({ area }) {
  return (
    <div className="delivery-estimate" aria-live="polite">
      <span>🚴 Estimated delivery</span>
      <strong>{getDeliveryEstimate(area)}</strong>
    </div>
  );
}

DeliveryEstimate.propTypes = {
  area: PropTypes.string,
};

DeliveryEstimate.defaultProps = {
  area: "",
};

export default DeliveryEstimate;
