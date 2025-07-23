import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Divider,
  LinearProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
  Fab,
} from "@mui/material";
import {
  AccessTime as AccessTimeIcon,
  ArrowForward as ArrowForwardIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { fetchPosts } from "../api/postApi";

const PostList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts();
        setPosts(data);
        setError(null);
      } catch (error) {
        setError("포스트를 불러오는 중 오류가 발생했습니다.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <LinearProgress color="primary" sx={{ height: 4, borderRadius: 2 }} />
        <Typography
          sx={{ textAlign: "center", mt: 2, color: "text.secondary" }}
        >
          포스트를 불러오는 중...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper
          elevation={0}
          sx={{ p: 3, bgcolor: "#f8f8f8", border: "1px solid #eeeeee" }}
        >
          <Typography color="text.primary" variant="h6">
            오류 발생
          </Typography>
          <Typography color="text.secondary">{error}</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4, position: "relative" }}>
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: "500",
          mb: 3,
          color: "text.primary",
          textAlign: "center",
        }}
      >
        포스트 목록
      </Typography>

      {/* 새 게시물 작성 버튼 */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => navigate("/new")}
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>

      {posts.length === 0 ? (
        <Paper
          sx={{
            p: 4,
            textAlign: "center",
            bgcolor: "#f8f8f8",
            border: "1px solid #eeeeee",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            등록된 포스트가 없습니다.
          </Typography>
        </Paper>
      ) : (
        <List sx={{ width: "100%", bgcolor: "background.paper", p: 0 }}>
          {posts.map((post) => (
            <Paper
              key={post.id}
              elevation={0}
              sx={{
                mb: 2,
                borderRadius: "4px",
                border: "1px solid #eaeaea",
                overflow: "hidden",
                transition: "box-shadow 0.2s",
                "&:hover": {
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                },
              }}
            >
              <ListItem
                alignItems="flex-start"
                sx={{
                  py: 2,
                  px: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      mb: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Chip
                        size="small"
                        label={`${post.id}`}
                        sx={{
                          mr: 2,
                          bgcolor: "#f5f5f5",
                          color: "text.secondary",
                          fontWeight: "medium",
                          minWidth: "32px",
                        }}
                      />
                      <Typography
                        variant="subtitle1"
                        component="h2"
                        sx={{
                          fontWeight: "500",
                          color: "text.primary",
                        }}
                      >
                        {post.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <AccessTimeIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                      {formatDate(post.createdAt)}
                    </Typography>
                  </Box>

                  <ListItemText
                    primary={null}
                    secondary={
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {post.content}
                      </Typography>
                    }
                  />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      mt: 1,
                    }}
                  >
                    <Button
                      size="small"
                      color="primary"
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => navigate(`/posts/${post.id}`)}
                      sx={{
                        textTransform: "none",
                        fontSize: "0.8rem",
                      }}
                    >
                      자세히 보기
                    </Button>
                  </Box>
                </Box>
              </ListItem>
            </Paper>
          ))}
        </List>
      )}

      <Box
        sx={{
          textAlign: "center",
          mt: 4,
          pt: 2,
          borderTop: "1px solid #eaeaea",
          color: "text.secondary",
          fontSize: "0.75rem",
        }}
      >
        <Typography variant="caption">Created by codingdonny</Typography>
      </Box>
    </Container>
  );
};

export default PostList;
