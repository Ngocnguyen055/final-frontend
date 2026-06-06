import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserComments() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchModel(`/api/comments/commentsOfUser/${userId}`)
      .then(setComments)
      .catch(console.error);
  }, [userId]);

  if (!comments) return <Typography>Loading...</Typography>;

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        User Comments
      </Typography>

      {comments.length === 0 && <Typography>No comments</Typography>}

      {comments.map((c) => (
        <Card
          key={c._id}
          sx={{
            display: "flex",
            marginBottom: 2,
            borderRadius: 3,
            boxShadow: 2,
          }}
        >
          {/* 📷 Thumbnail */}
          <CardMedia
            component="img"
            image={`/images/${c.photo_file_name}`}
            sx={{ width: 120, cursor: "pointer" }}
            onClick={() => navigate(`/photos/${c.photo_owner_id}`)}
          />

          <CardContent
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(`/photos/${c.photo_owner_id}`)}
          >
            <Typography variant="body1">{c.comment}</Typography>

            <Typography variant="caption" color="text.secondary">
              {new Date(c.date_time).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ))}

      <Divider />
    </div>
  );
}

export default UserComments;
