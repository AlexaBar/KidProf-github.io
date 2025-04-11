import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';
import './Verify.css'

const Verify = () => {
  const { url } = useContext(StoreContext)
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")

  const navigate = useNavigate();

  const verifyPayment = useCallback(async () => {
    try {
      const response = await fetch(`${url}/api/order/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ success, orderId }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        navigate('/myorders');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      navigate('/');
    }
  }, [url, success, orderId, navigate]);

  useEffect(() => {
    verifyPayment();
  }, [verifyPayment]);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;