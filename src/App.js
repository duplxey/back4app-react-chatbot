import React, {useEffect, useState} from "react";
import {Box, Button, Card, CardContent, Grid, TextField} from "@mui/material";
import Message from "./components/Message";

function App() {

  const messagesListRef = React.createRef();
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([
    {
      content: "Hi there! 👋 I'm your digital assistant. Feel free to ask me anything!",
      choices: ["Shipping", "Size guide", "Contact Us"],
      isCustomer: false,
    },
    {
      content: "Shipping",
      isCustomer: true,
    },
    {
      content: "Orders typically take 2-3 business days to process and in-stock items will usually be delivered in 3-5 days from the date that they ship. Shipping cost is 12$.",
      isCustomer: false,
    },
    {
      content: "what t-shirt size should i get?",
      isCustomer: true,
    },
    {
      content: "img[https://i.ibb.co/xDq9LSr/sizeguide.png]",
      isCustomer: false,
    },
  ]);

  const sendMessage = (message) => {
    // append the message to the array
    setMessages([
      ...messages,
      {
        content: message,
        isCustomer: true,
      },
    ]);

    // submit the message to the server
    console.log(message);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    sendMessage(messageInput);

    // clear the message input
    setMessageInput("");
  }

  const handleChoice = (choice) => {
    sendMessage(choice);
  }

  useEffect(() => {
    messagesListRef.current.scrollTop = messagesListRef.current.scrollHeight;
  }, [messagesListRef, messages]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Card sx={{maxWidth: 400}}>
        <CardContent>
          <Box
            ref={messagesListRef}
            sx={{
              height: 420,
              overflow: "scroll",
              overflowX: "hidden",
            }}
          >
            <Box sx={{m: 1, mr: 2}}>
              {messages.map((message, index) => (
                <Message
                  key={index}
                  content={message.content}
                  isCustomer={message.isCustomer}
                  choices={message.choices}
                  handleChoice={handleChoice}
                />
              ))}
            </Box>
          </Box>
          <Box
            component="form"
            sx={{
              mt: 2,
              display: "flex",
              flexFlow: "row",
              gap: 1,
            }}
          >
            <TextField
              variant="outlined"
              size="small"
              value={messageInput}
              onChange={(event) => setMessageInput(event.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              type="submit"
            >
              Send
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default App;
