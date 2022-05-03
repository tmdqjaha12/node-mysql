const Sequelize = require("sequelize");
class User extends Sequelize.Model {
  // 스태틱 메소드
  // 테이블에 대한 설정
  static init(sequelize) {
    return super.init(
      {
        // 첫번째 객체 인수는 테이블 필드에 대한 설정
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        age: {
          type: Sequelize.SMALLINT,
          allowNull: false,
        },
        married: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        // 두번째 객체 인수는 테이블 자체에 대한 설정
        sequelize /* static init 메서드의 매개변수와 연결되는 옵션으로, db.sequelize 객체를 넣어야 한다. */,
        timestamps: false /* true : 각각 레코드가 생성, 수정될 때의 시간이 자동으로 입력된다. */,
        underscored: false /* 카멜 표기법을 스네이크 표기법으로 바꾸는 옵션 */,
        modelName: "User" /* 모델 이름을 설정. */,
        tableName: "users" /* 데이터베이스의 테이블 이름. */,
        paranoid: false /* true : deletedAt이라는 컬럼이 생기고 지운 시각이 기록된다. */,
        charset: "utf8" /* 인코딩 */,
        collate: "utf8_general_ci",
      }
    );
  }
  // 다른 모델과의 관계
  static associate(db) {
    // 인자로 index.js에서 만든 여러 테이블이 저장되어있는 db객체를 받을 것이다.
    db.User.hasMany(db.Comment, {
      foreignKey: "commenter",
      sourceKey: "id",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    // db.User (hasMany) db.Comment = 1:N 관계 이다.
    // db.User는 가지고있다. 많이. db.Comment를
  }
}
module.exports = User;

// module.exports = (sequelize, DataTypes) => {
//   const Test = sequelize.define(
//     "test",
//     {
//       test_idx: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       test_id: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//       },
//       test_pw: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//       },
//       test_email: {
//         type: DataTypes.STRING(255),
//         allowNull: true,
//         validate: {
//           isEmail: true,
//         },
//       },
//       test_name: {
//         type: DataTypes.STRING(255),
//         allowNull: true,
//       },
//       test_memo: {
//         type: DataTypes.STRING(255),
//         allowNull: true,
//       },
//       test_num: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         defaultValue: 0,
//       },
//       test_flag: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: false,
//       },
//       test_deletion: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: false,
//       },
//       test_cre_datetime: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: DataTypes.NOW,
//       },
//       test_upd_datetime: {
//         type: DataTypes.DATE,
//       },
//       test_del_datetime: {
//         type: DataTypes.DATE,
//       },
//     },
//     {
//       charset: "utf8", // 한국어 설정
//       collate: "utf8_general_ci", // 한국어 설정
//       tableName: "test", // 테이블 이름 정의
//       timestamps: false, // createAt, updateAt 활성화
//       paranoid: false, // deleteAt 옵션
//     }
//   );

//   return Test;
// };
