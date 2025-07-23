import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { fetchPostById, deletePost } from "../api/postApi";
import { useSnackbar } from "../context/SnackbarContext";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // 게시물 데이터 가져오기
  useEffect(() => {
    const getPostData = async () => {
      try {
        setLoading(true);
        const data = await fetchPostById(id);
        setPost(data);
        setError(null);
      } catch (error) {
        setError("게시물을 불러오는 중 오류가 발생했습니다.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getPostData();
  }, [id]);

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // 게시물 삭제 처리
  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deletePost(id);
      setDeleteDialogOpen(false);
      showSnackbar("게시물이 성공적으로 삭제되었습니다.", "success");
      navigate("/");
    } catch (error) {
      setError("게시물 삭제 중 오류가 발생했습니다.");
      showSnackbar("게시물 삭제 중 오류가 발생했습니다.", "error");
      console.error(error);
      setDeleteDialogOpen(false);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <Container
        maxWidth="md"
        sx={{ display: "flex", justifyContent: "center", mt: 4 }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
          >
            목록으로 돌아가기
          </Button>
        </Box>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="warning">게시물을 찾을 수 없습니다.</Alert>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
          >
            목록으로 돌아가기
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
        >
          목록으로
        </Button>
      </Box>

      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 500,
              wordBreak: "break-word",
            }}
          >
            {post.title}
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              size="small"
              startIcon={<EditIcon />}
              onClick={() => navigate(`/edit/${id}`)}
            >
              수정
            </Button>
            <Button
              size="small"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => setDeleteDialogOpen(true)}
            >
              삭제
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            #{post.id}
          </Typography>
          {post.createdAt && (
            <Typography variant="body2" color="text.secondary">
              {formatDate(post.createdAt)}
            </Typography>
          )}
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.7,
            whiteSpace: "pre-wrap",
          }}
        >
          {post.content}
        </Typography>

        <Box
          sx={{
            textAlign: "right",
            mt: 3,
            pt: 2,
            borderTop: "1px solid #eaeaea",
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Created by codingdonny
          </Typography>
        </Box>
      </Paper>

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

export default PostDetail;
