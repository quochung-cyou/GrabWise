import { motion } from "framer-motion";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Trần Thị Thu Uyên",
      role: "B21DCTC103",
      image: "https://i.ibb.co/jRGG9vm/cf84ba29dc10cfde3a4b40c5e0067983.png",
      description: ""
    },
    {
      name: "Bì Thị Linh Giang",
      role: "B21DCTC37",
      image: "https://i.ibb.co/Kh7yb00/2b75fdddcf96a560f8f23d0037a53dbe.jpg",
      description: ""
    },
    {
      name: "Vũ Quỳnh Giang",
      role: "B21DCTC039",
      image: "https://i.ibb.co/52B31cR/434c72e5a2cc1ed7c36ff9f8b372e9a1.png",
      description: ""
    },
    {
      name: "Vũ Thị Thùy Linh",
      role: "B21DCTC063",
      image: "https://i.ibb.co/XjrcxXf/c00b5659825c51ef0bdad42e187262c8.jpg",
      description: ""
    },
    {
      name: "Lâm Thảo Ngọc",
      role: "B21DCTC073",
      image: "https://i.ibb.co/dgwR6QJ/91342619018a64d082741378c42995ab.jpg",
      description: ""
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Development Team</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the people behind this project
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group text-center"
            >
              <div className="relative mb-6 mx-auto w-48 h-48 overflow-hidden rounded-full">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-primary font-medium mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;