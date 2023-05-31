import { Card, Image, Input, List, Space, Typography } from "antd";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [searchedText, setSearchedText] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/search?q=${searchedText}`)
      .then((res) => res.json())
      .then((response) => {
        setLoading(false);
        setDataSource(response.products);
      });
  }, [searchedText]);
  // return <Component {...pageProps} />;

  return (
    <Space style={{ padding: "0px 16px" }} direction="vertical">
      <Typography.Title
        style={{ textAlign: "center", fontFamily: "monospace" }}
      >
        Maria Fitness
      </Typography.Title>
      <Input.Search
        style={{ maxWidth: 500, display: "flex", margin: "auto" }}
        onSearch={(value) => {
          setSearchedText(value);
        }}
      ></Input.Search>
      <Typography>
        Mostrando:{" "}
        <Typography.Text strong>
          {searchedText || "Todos os produtos"}
        </Typography.Text>{" "}
      </Typography>
      <List
        loading={loading}
        dataSource={dataSource}
        grid={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xx: 6 }}
        renderItem={(item) => {
          return (
            <Card
              hoverable
              key={item.id}
              style={{ height: 300, margin: 12, overflow: "hidden" }}
            >
              <Image
                src={item.thumbnail}
                preview={{ visible: false }}
                onClick={() => {
                  setPreviewImages(item.images);
                }}
              ></Image>
              <Typography>
                <Typography.Title strong style={{ fontSize: 18 }}>
                  {item.title}
                </Typography.Title>
                <Typography.Text strong style={{ fontSize: 12 }}>
                  Fabricante: {item.brand}
                </Typography.Text>
                <br />
                <Typography.Text style={{ fontSize: 10 }}>
                  Preço: {item.price} Avaliação: {item.rating}
                  <br />
                  Descrição: {item.description}
                </Typography.Text>{" "}
              </Typography>
            </Card>
          );
        }}
      ></List>
      {previewImages.length > 0 ? (
        <Image.PreviewGroup
          preview={{
            visible: previewImages.length,
            onVisibleChange: (value) => {
              if (!value) {
                setPreviewImages([]);
              }
            },
          }}
        >
          {previewImages.map((image) => {
            return <Image src={image} />;
          })}
        </Image.PreviewGroup>
      ) : null}
    </Space>
  );
}
