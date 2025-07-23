import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { ArticleOutlined as ArticleIcon } from "@mui/icons-material";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import PostForm from "./components/PostForm";

// Material UI 테마 설정 - 심플한 단색 위주로 변경
const theme = createTheme({
  palette: {
    primary: {
      main: "#2c3e50",
      light: "#3e5771",
      dark: "#1a2530",
    },
    secondary: {
      main: "#34495e",
      light: "#4e6986",
      dark: "#22303f",
    },
    background: {
      default: "#f9f9f9",
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: '"Pretendard", "Roboto", "Arial", sans-serif',
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 400,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: "none",
          fontWeight: 400,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#333333",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <AppBar position="static" elevation={1} sx={{ mb: 2 }}>
            <Toolbar>
              <ArticleIcon
                sx={{ mr: 2, color: "primary.main" }}
                component={Link}
                to="/"
              />
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  flexGrow: 1,
                  fontWeight: "500",
                  color: "primary.main",
                  textDecoration: "none",
                }}
              >
                포스트 애플리케이션
              </Typography>
            </Toolbar>
          </AppBar>
          <Container component="main" sx={{ mt: 2, mb: 4, flex: 1 }}>
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/posts/:id" element={<PostDetail />} />
              <Route path="/new" element={<PostForm isEditing={false} />} />
              <Route path="/edit/:id" element={<PostForm isEditing={true} />} />
            </Routes>
          </Container>
          <Box
            component="footer"
            sx={{
              p: 2,
              mt: "auto",
              backgroundColor: "#f5f5f5",
              textAlign: "center",
              borderTop: "1px solid #eeeeee",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} 포스트 애플리케이션
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 0.5 }}
            >
              Created by codingdonny
            </Typography>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
