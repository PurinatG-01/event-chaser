import { Event } from "~/models/Event"
import { motion } from "framer-motion"
import Link from "next/link"

const CardContainer = motion.div
export default function EventCard(props: Props) {
  const { event, isTopCard } = props
  return (
    <CardContainer
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
      className={`w-full h-[400px] cursor-pointer !hadow-none !border-none !relative ${
        isTopCard ? "!border-8 !border-[#ffba3b]" : ""
      }`}
    >
      <Link href={`/event/${event.id}`} className="z-10 absolute top-0 left-0 w-full h-full" />
      {isTopCard && (
        // <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        //   <Badge enableShadow disableOutline color="warning">
        //     Top Event
        //   </Badge>
        // </Card.Header>
        <></>
      )}
      {/* <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={`${event.thumbnail}?index=${event.id}`}
          width="100%"
          height="100%"
          objectFit="cover"
          alt="Card example background"
        />
      </Card.Body> */}
      {/* {!isTopCard && ( */}
      {/* <Card.Footer
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
        </Row>
      </Card.Footer> */}
      {/* )} */}
    </CardContainer>
  )
}

type Props = {
  event: Event
  isTopCard?: boolean
}
