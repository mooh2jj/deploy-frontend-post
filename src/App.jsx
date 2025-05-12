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
import PostList from "./components/PostList";

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
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <AppBar position="static" elevation={1} sx={{ mb: 2 }}>
          <Toolbar>
            <ArticleIcon sx={{ mr: 2, color: "primary.main" }} />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontWeight: "500", color: "primary.main" }}
            >
              포스트 애플리케이션
            </Typography>
          </Toolbar>
        </AppBar>
        <Container component="main" sx={{ mt: 2, mb: 4, flex: 1 }}>
          <PostList />
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
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
