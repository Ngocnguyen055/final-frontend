import React, { useState, useEffect } from "react";
import { Typography, Divider } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData"; // Đảm bảo đường dẫn này đúng với project của bạn

import "./styles.css";

/**
 * Define UserDetail, a React component of Project 4/5/6.
 */
function UserDetail() {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchModel(`/api/user/${userId}`);
        console.log(response);
        setUserDetails(response);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userDetails) {
    return <Typography variant="body1">Loading user details...</Typography>;
  }

  return (
    <div className="user-detail-container">
      <Typography variant="h4" gutterBottom>
        {userDetails.first_name} {userDetails.last_name}
      </Typography>

      <Divider style={{ margin: "10px 0" }} />

      <Typography variant="body1">
        <strong>Location:</strong> {userDetails.location}
      </Typography>
      <Typography variant="body1">
        <strong>Description:</strong> {userDetails.description}
      </Typography>
      <Typography variant="body1">
        <strong>Occupation:</strong> {userDetails.occupation}
      </Typography>

      <Divider style={{ margin: "10px 0" }} />

      {/* Thêm link để chuyển sang trang xem ảnh của user này */}
      <Link to={`/photos/${userId}`}>
        <Typography variant="button" color="primary">
          View {userDetails.first_name}'s Photos
        </Typography>
      </Link>
    </div>
  );
}

export default UserDetail;
