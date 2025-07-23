import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { createPost, fetchPostById, updatePost } from "../api/postApi";

const PostForm = ({ isEditing }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // 수정 모드인 경우 게시물 데이터 가져오기
  useEffect(() => {
    if (isEditing && id) {
      const getPostData = async () => {
        try {
          setLoading(true);
          const data = await fetchPostById(id);
          setFormData({
            title: data.title,
            content: data.content,
          });
          setError(null);
        } catch (error) {
          setError("게시물을 불러오는 중 오류가 발생했습니다.");
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      getPostData();
    }
  }, [id, isEditing]);

  // 입력 필드 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 입력 검증
    if (!formData.title.trim() || !formData.content.trim()) {
      setError("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      if (isEditing) {
        // 게시물 수정
        await updatePost(id, formData);
        navigate(`/posts/${id}`);
      } else {
        // 새 게시물 작성
        const postId = await createPost(formData);
        navigate("/");
      }
    } catch (error) {
      setError(
        isEditing
          ? "게시물 수정 중 오류가 발생했습니다."
          : "게시물 작성 중 오류가 발생했습니다."
      );
      console.error(error);
    } finally {
      setSubmitting(false);
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

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {isEditing ? "게시물 수정" : "새 게시물 작성"}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="제목"
            name="title"
            value={formData.title}
            onChange={handleChange}
            autoFocus
            sx={{ mb: 2 }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="content"
            label="내용"
            id="content"
            multiline
            rows={8}
            value={formData.content}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              disabled={submitting}
            >
              취소
            </Button>
            <Button type="submit" variant="contained" disabled={submitting}>
              {submitting ? (
                <CircularProgress size={24} />
              ) : isEditing ? (
                "수정하기"
              ) : (
                "작성하기"
              )}
            </Button>
          </Box>

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
        </Box>
      </Paper>
    </Container>
  );
};

export default PostForm;
