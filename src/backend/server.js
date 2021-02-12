import Server from "../internet/Server";
import { TimeoutPromise } from "../utils/TimeoutPromise";
import { connectDB } from "./MyDB";
import Card from "./model/Card";

export const initBackend = TimeoutPromise((res, rej) => {
  try {
    // when db is connected, client can init and fetch data
    const server = new Server({ domain: "localhost", scheme: "http" });
    server.listen(3000, () => console.log("listening 3000 port..."));

    server.get("/cards", async (req, res) => {
      try {
        let cards = await Card.getAll();
        cards = cards.map((card) => ({
          ...card,
          id: card._id
        }));

        res.status(200).json(cards);
      } catch (e) {
        const error = new Error(e.message);
        error.status = 409;
        throw new Error(error);
      }
    });

    server.post("/cards", async (req, res) => {
      const { title, content } = req.body;
      try {
        const card = await Card({ title, content });

        res.status(201).json(card);
      } catch (e) {
        const error = new Error(e.message);
        error.status = 409;
        throw error;
      }
    });

    server.put("/cards", async (req, res) => {
      const { id, data } = req.body;

      try {
        const updated = await Card.update(id, data);
        if (!updated) {
          res.status(204);
        }
        res.status(200).json(updated);
      } catch (e) {
        const error = new Error(e.message);
        error.status = 409;
        throw error;
      }
    });

    server.delete("/cards", async (req, res) => {
      const { id } = req.body;

      try {
        const deleted = await Card.delete(id);
        if (!deleted) {
          res.status(204);
        }
        res.status(200).json(deleted);
      } catch (e) {
        const error = new Error(e.message);
        error.status = 409;
        throw error;
      }
    });

    connectDB.then(async () => {
      const mock = [
        {
          title: "[UI] error message",
          content: "에러 메세지로 서버 요청 실패 시 error를 catch하는 메세지"
        },
        {
          title: "[UI] update card",
          content: "수정 추가하기"
        },
        {
          title: "[UI, model, API] delete card",
          content:
            "삭제 아이콘 클릭 시, 확인 메세지 띄우기, 한 번에 여러 메세지 지우기 => MyDB, database 수정"
        },
        { title: "PostCard", content: "editor 라이브러리 추가하기" },
        { title: "[API] create cards", content: "여러 포스트 한 번에 추가" },
        {
          title: "local storage",
          content:
            "로컬 스토리지로 포스트 추가, 수정 후 주기적으로 서버에서 동기화하기(데이터가 다를 경우만 요청)"
        },
        {
          title: "[UI, model, API] 카드 카테고리화하기",
          content:
            "카드 모델에 카테고리 정보 추가, UI에서 필터링 후 카테고라이징"
        },
        {
          title: "[UI] 레이아웃",
          content: "반응형 추가, 컴포넌트 레이아웃"
        }
      ];
      await mock.forEach(async (card) => {
        await Card(card);
      });
      res("server is connected");
    });
  } catch (e) {
    res(e);
  }
}, 1000);
