import { Card, Col, Row, Button, Text, Badge } from "@nextui-org/react"
import { Event } from "~/models/Event"
import { motion } from "framer-motion"
const CardContainer = motion(Card)
export default function EventCard(props: Props) {
  const { event, isTopCard } = props
  return (
    <CardContainer
      css={{ w: "100%", h: "400px" }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
      className={`cursor-pointer !hadow-none !border-none ${
        isTopCard ? "!border-8 !border-[#ffba3b]" : ""
      }`}
    >
      {isTopCard && (
        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
          <Badge enableShadow disableOutline color="warning">
            Top Event
          </Badge>
        </Card.Header>
      )}
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={`${event.thumbnail}?index=${event.id}`}
          width="100%"
          height="100%"
          objectFit="cover"
          alt="Card example background"
        />
      </Card.Body>
      {/* {!isTopCard && ( */}
      <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          bgBlur: "#ffffff66",
          borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row className="flex gap-2 !flex-col md:!flex-row">
          <Col>
            <Text h3 color="#000" size={20} className="line-clamp-1">
              {event.title}
            </Text>
            <Text color="#000" size={12} className="line-clamp-1">
              {event.description}
            </Text>
          </Col>
          <Col className="w-full md:flex-auto md:!w-auto">
            <Row className="w-full md:flex-end md:w-auto flex">
              <Button
                auto
                rounded
                color="warning"
                className="!w-full md:!w-auto"
              >
                <Text
                  css={{ color: "inherit" }}
                  size={12}
                  weight="bold"
                  transform="uppercase"
                >
                  Purchase
                </Text>
              </Button>
            </Row>
          </Col>
        </Row>
      </Card.Footer>
      {/* )} */}
    </CardContainer>
  )
}

type Props = {
  event: Event
  isTopCard?: boolean
}
