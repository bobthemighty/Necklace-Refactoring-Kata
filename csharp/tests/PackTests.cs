﻿using Microsoft.VisualStudio.TestTools.UnitTesting;
using NecklaceRefactoringKata.Enums;
using NecklaceRefactoringKata.JewelleryTypes;

namespace NecklaceRefactoringKata.Tests
{
    [TestClass()]
    public class PackTests
    {
        [TestMethod()]
        public void Test_EarringStud_IsPackedInTopShelf()
        {
            //arrange
            var jewelleryStorage = new JewelleryStorage();
            var item = new Earring(Type: EarringType.Stud, Stone: Jewel.Amber);
            
            //act
            Packer.Pack(item, jewelleryStorage);

            //assert
            CollectionAssert.Contains(jewelleryStorage.Box.TopShelf, item);
        }

        //To devs: Write more tests here before you refactor
        //note: JewelleryBase types are records, so they automatically have value-based equality checks
        //and can be used with CollectionAssert
    }
}