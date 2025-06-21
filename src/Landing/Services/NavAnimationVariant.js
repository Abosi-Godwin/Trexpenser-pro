export const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.25,
      ease: "easeInOut"
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};


export const slideUpVariant = {
    hidden: { y: 50, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 1, ease: "easeOut" }
    }
    
};