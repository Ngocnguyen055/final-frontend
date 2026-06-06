import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Divider,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";

import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetchModel(`/api/photo/photosOfUser/${userId}`);

        setPhotos(response);
      } catch (error) {
        console.error("Lỗi khi lấy photos:", error);
      }
    };

    fetchPhotos();
  }, [userId]);

  if (!photos || photos.length === 0) {
    return <Typography>Loading photos...</Typography>;
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        User Photos
      </Typography>

      {photos.map((photo) => (
        <Card key={photo._id} style={{ marginBottom: "20px" }}>
          {/* IMAGE */}
          <CardMedia
            component="img"
            height="300"
            image={`/images/${photo.file_name}`}
            alt="User Photo"
          />

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {photo.date_time}
            </Typography>

            <Divider style={{ margin: "10px 0" }} />

            {/* COMMENTS */}
            {photo.comments &&
              photo.comments.map((comment) => (
                <div key={comment._id} style={{ marginBottom: "10px" }}>
                  <Typography variant="body2">
                    {comment.user ? (
                      <Link to={`/users/${comment.user._id}`}>
                        {comment.user.first_name} {comment.user.last_name}
                      </Link>
                    ) : (
                      "Unknown User"
                    )}
                    : {comment.comment}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    {comment.date_time}
                  </Typography>

                  <Divider style={{ margin: "5px 0" }} />
                </div>
              ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;
