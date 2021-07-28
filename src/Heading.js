import { motion } from "framer-motion";
const Heading = () => {
    return (
        <motion.h1
          className="main-heading"
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: -150, opacity: 1 }}
          transition={{
            delay: 1.5,
            duration: 0.3,
            type: "spring",
            stiffness: 200,
          }}
        >
          Randomizer
        </motion.h1>
    )
}
export default Heading;