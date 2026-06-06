import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Badge,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchModel("/api/user/list").then(setUsers).catch(console.error);
  }, []);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        User List
      </Typography>

      <List>
        {users.map((user) => (
          <React.Fragment key={user._id}>
            <ListItem
              button
              onClick={() => navigate(`/users/${user._id}`)}
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <ListItemText primary={`${user.first_name} ${user.last_name}`} />

              <Box sx={{ display: "flex", gap: 3 }}>
                {/* 🟢 Photo count */}
                <Badge badgeContent={user.photo_count} color="success" />

                {/* 🔴 Comment count */}
                <Badge
                  badgeContent={user.comment_count}
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/comments/${user._id}`);
                  }}
                  sx={{ cursor: "pointer" }}
                />
              </Box>
            </ListItem>

            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;
