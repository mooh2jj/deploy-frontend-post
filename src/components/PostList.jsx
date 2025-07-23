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
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import {
  AccessTime as AccessTimeIcon,
  ArrowForward as ArrowForwardIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { fetchPosts, deletePost } from "../api/postApi";
import { useSnackbar } from "../context/SnackbarContext";

const PostList = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // 게시물 목록 불러오기
  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts();
        setPosts(data);
        setError(null);
      } catch (error) {
        setError("포스트를 불러오는 중 오류가 발생했습니다.");
        showSnackbar("포스트를 불러오는 중 오류가 발생했습니다.", "error");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [showSnackbar]);

  // 게시물 삭제 처리
  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!postToDelete) return;

    try {
      setDeleting(true);
      await deletePost(postToDelete.id);
      setPosts(posts.filter((post) => post.id !== postToDelete.id));
      showSnackbar("게시물이 성공적으로 삭제되었습니다.", "success");
    } catch (error) {
      setError("게시물 삭제 중 오류가 발생했습니다.");
      showSnackbar("게시물 삭제 중 오류가 발생했습니다.", "error");
      console.error(error);
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    }
  };

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
            bgcolor: "transparent",
            border: "none",
            boxShadow: "none",
          }}
        >
          <img
            src="/codingdonny.png"
            alt="메인 캐릭터"
            style={{
              maxWidth: "200px",
              marginBottom: "16px",
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
            }}
          />
          <Typography variant="h6" color="text.secondary">
            아직 등록된 포스트가 없어요!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            첫 번째 포스트를 작성해보세요.
          </Typography>
          <Button variant="contained" onClick={() => navigate("/new")}>
            새 포스트 작성하기
          </Button>
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
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 1,
                    }}
                  >
                    <Box>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => navigate(`/edit/${post.id}`)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteClick(post)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
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

      {/* 삭제 확인 다이얼로그 */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => !deleting && setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">게시물 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            이 게시물을 정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            disabled={deleting}
          >
            취소
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            disabled={deleting}
            autoFocus
          >
            {deleting ? <CircularProgress size={24} /> : "삭제"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PostList;
