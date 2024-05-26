import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FaRegStar } from "react-icons/fa";


const ReactionButton = ({ itemId }) => {
  const [reacted, setReacted] = useState(false);

  const toggleReaction = async () => {
    try {
      const response = await fetch('https://recipe-server-psi.vercel.app/api/reactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle reaction');
      }

      const data = await response.json();
      setReacted(data.reacted);
      const action = data.reacted ? 'added' : 'removed';
      Swal.fire({
        icon: 'success',
        title: `Reaction ${action} successfully`,
      });
    } catch (error) {
      console.error('Error toggling reaction:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to toggle reaction',
      });
    }
  };

  return (
    <button onClick={toggleReaction}>
      {reacted ? 'Remove Reaction' :
        <div className='flex gap-3'>
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />

        </div>

      }
    </button>
  );
};

export default ReactionButton;
